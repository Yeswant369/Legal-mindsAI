const N8N_WEBHOOK_URL = "https://vagdeviii.app.n8n.cloud/webhook-test/legal-document-upload";

export interface WebhookPayload {
  project_name: string;
  analysis_type: "legal" | "hr" | "comparison";
  pdf_file: string;
  client_policy_pdf?: string;
  hr_policy_pdf?: string;
  email: string;
  jurisdiction: string;
  file_name: string;
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
  analysisType: "legal" | "hr" | "comparison",
  files: { main?: File; client?: File; hr?: File },
  email: string,
  jurisdiction: string
): Promise<void> {
  let pdfBase64 = "";
  let clientBase64 = "";
  let hrBase64 = "";
  let fileName = "";

  if (analysisType === "comparison") {
    if (files.client) clientBase64 = await fileToBase64(files.client);
    if (files.hr) hrBase64 = await fileToBase64(files.hr);
    fileName = [files.client?.name, files.hr?.name].filter(Boolean).join(", ");
  } else {
    if (files.main) {
      pdfBase64 = await fileToBase64(files.main);
      fileName = files.main.name;
    }
  }

  const payload: WebhookPayload = {
    project_name: "LEGALMIND",
    analysis_type: analysisType,
    pdf_file: pdfBase64,
    ...(analysisType === "comparison" && {
      client_policy_pdf: clientBase64,
      hr_policy_pdf: hrBase64,
    }),
    email,
    jurisdiction,
    file_name: fileName,
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
