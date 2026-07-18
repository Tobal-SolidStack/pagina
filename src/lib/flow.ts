import crypto from "crypto";

function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

function sign(params: Record<string, string>): string {
  const secretKey = getEnv("FLOW_SECRET_KEY");
  const keys = Object.keys(params).sort();
  const toSign = keys.map((k) => `${k}${params[k]}`).join("");
  return crypto.createHmac("sha256", secretKey).update(toSign).digest("hex");
}

function toFormBody(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

function getApiUrl(): string {
  return process.env.FLOW_API_URL ?? "https://sandbox.flow.cl/api";
}

export async function flowPost<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const apiKey = getEnv("FLOW_API_KEY");
  const all: Record<string, string> = { ...params, apiKey };
  all.s = sign(all);

  const res = await fetch(`${getApiUrl()}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: toFormBody(all),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`FLOW ${endpoint} ${res.status}: ${text}`);
  return JSON.parse(text) as T;
}

export async function flowGet<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const apiKey = getEnv("FLOW_API_KEY");
  const all: Record<string, string> = { ...params, apiKey };
  all.s = sign(all);

  const res = await fetch(`${getApiUrl()}/${endpoint}?${toFormBody(all)}`);
  const text = await res.text();
  if (!res.ok) throw new Error(`FLOW ${endpoint} ${res.status}: ${text}`);
  return JSON.parse(text) as T;
}

export type FlowPaymentResponse = {
  url: string;
  token: string;
  flowOrder?: number;
};

export type FlowPaymentStatus = {
  flowOrder: number;
  commerceOrder: string;
  requestDate: string;
  status: 1 | 2 | 3 | 4; // 1=pending, 2=paid, 3=rejected, 4=cancelled
  subject: string;
  currency: string;
  amount: number;
  payer: string;
  optional?: string;
};

export type FlowCustomer = {
  customerId: string;
  name: string;
  email: string;
  externalId?: string;
};

export type FlowRegisterResponse = {
  url: string;
  token: string;
};

export type FlowRegisterStatus = {
  status: 1 | 2; // 1=registered, 2=error
  customerId: string;
  creditCardType?: string;
  last4CardDigits?: string;
};

export type FlowSubscription = {
  subscriptionId: string;
  planId: string;
  customerId: string;
  status: string;
};
