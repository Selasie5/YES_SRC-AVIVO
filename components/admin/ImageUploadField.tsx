"use client";

import { useRef, useState } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import { uploadToCloudinary } from "../../lib/cloudinary";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUploadField({
  label,
  value,
  onChange,
  cover = false,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  cover?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch {
      setError("Could not upload your image. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
          {uploading ? (
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-500"
              aria-hidden
            />
          ) : value ? (
            <img
              src={value}
              alt=""
              className={`h-full w-full ${cover ? "object-cover" : "object-contain"}`}
            />
          ) : (
            <UploadSimple size={20} className="text-zinc-400" />
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(event) => void handleFileChange(event)}
        />
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-fit rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            {uploading ? "Uploading…" : value ? "Change image" : "Upload image"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-fit text-left text-xs font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}