const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://yeswant.app.n8n.cloud/webhook-test/legalmind";

export interface WebhookPayload {
  project_name: string;
  pdf_files: { name: string; base64: string }[];
  email: string;
  jurisdiction: string;
  file_names: string;
  submission_timestamp: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function submitToWebhook(
  files: File[],
  email: string,
  jurisdiction: string
): Promise<void> {
  const pdfFiles = await Promise.all(
    files.map(async (file) => ({
      name: file.name,
      base64: await fileToBase64(file),
    }))
  );

  const payload: WebhookPayload = {
    project_name: "LEGALMIND",
    pdf_files: pdfFiles,
    email,
    jurisdiction,
    file_names: files.map((f) => f.name).join(", "),
    submission_timestamp: new Date().toISOString(),
  };

  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Webhook error: ${res.status}`);
  }
}
