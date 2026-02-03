import { useState } from "react";

export default function SenderPage() {
  const [form, setForm] = useState({
    senderName: "",
    receiverName: "",
    message: "",
  });
  const [link, setLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const url = new URL("/valentine", window.location.origin);
    url.searchParams.set("from", form.senderName);
    url.searchParams.set("to", form.receiverName);
    if (form.message) url.searchParams.set("msg", form.message);
    setLink(url.toString());
    setCopied(false);
  };

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const copyLink = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-rose-600">Send a Valentine 💌</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input
          required
          className="w-full rounded-xl border border-rose-200 bg-white/80 p-3 shadow-sm focus:ring-2 focus:ring-rose-300"
          placeholder="Your name"
          value={form.senderName}
          onChange={update("senderName")}
        />
        <input
          required
          className="w-full rounded-xl border border-rose-200 bg-white/80 p-3 shadow-sm focus:ring-2 focus:ring-rose-300"
          placeholder="Their name"
          value={form.receiverName}
          onChange={update("receiverName")}
        />
        <textarea
          className="w-full rounded-xl border border-rose-200 bg-white/80 p-3 shadow-sm focus:ring-2 focus:ring-rose-300"
          placeholder="Optional message"
          value={form.message}
          onChange={update("message")}
        />
        <button className="w-full rounded-xl bg-rose-400 text-white py-3 font-semibold shadow-float transition hover:scale-[1.02] disabled:opacity-60">
          Make link
        </button>
      </form>
      {link && (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold text-rose-700">Copy & share this link:</p>
          <div className="flex items-center gap-2">
            <input
              className="flex-1 rounded-lg border border-rose-200 bg-white/80 px-3 py-2 text-xs"
              value={link}
              readOnly
            />
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg bg-rose-300 text-white px-3 py-2 text-xs font-semibold shadow-sm hover:scale-105 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
