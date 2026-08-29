'use client';

import { FileCheck2, FileUp, RefreshCw, Trash2, TriangleAlert } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import { formatFileSize } from '@/lib/form-utils';

const acceptedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'docx'];
const acceptedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const maxFileSize = 10 * 1024 * 1024;
const maxFiles = 5;

export type LocalFile = {
  id: string;
  file: File;
};

export function FileUpload({
  files,
  onChange,
  required = false,
  uploadState = 'idle',
}: {
  files: LocalFile[];
  onChange: (files: LocalFile[]) => void;
  required?: boolean;
  uploadState?: 'idle' | 'uploading' | 'success' | 'error';
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const processFiles = (incoming: FileList | File[]) => {
    setError('');
    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= maxFiles) {
        setError('حداکثر ۵ فایل قابل انتخاب است.');
        break;
      }
      const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!acceptedExtensions.includes(extension) || (file.type && !acceptedMimeTypes.includes(file.type))) {
        setError(`فرمت فایل «${file.name}» پشتیبانی نمی‌شود.`);
        continue;
      }
      if (file.size === 0) {
        setError(`فایل «${file.name}» خالی است.`);
        continue;
      }
      if (file.size > maxFileSize) {
        setError(`حجم فایل «${file.name}» بیشتر از ۱۰ مگابایت است.`);
        continue;
      }
      if (next.some((item) => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) {
        setError(`فایل «${file.name}» قبلاً انتخاب شده است.`);
        continue;
      }
      next.push({ id: crypto.randomUUID(), file });
    }
    onChange(next);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="file-upload">
      <input
        ref={inputRef}
        id={inputId}
        className="sr-only"
        type="file"
        multiple
        required={required && files.length === 0}
        accept=".pdf,.jpg,.jpeg,.png,.docx"
        onChange={(event) => event.target.files && processFiles(event.target.files)}
      />
      <button
        type="button"
        className={`file-dropzone${dragging ? ' is-dragging' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          processFiles(event.dataTransfer.files);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <span><FileUp aria-hidden="true" /></span>
        <strong>فایل‌ها را اینجا رها کنید یا برای انتخاب بزنید</strong>
        <small>PDF، JPG، PNG و DOCX — هر فایل تا ۱۰ مگابایت</small>
      </button>
      <p className="file-upload__privacy">فایل در این مرحله فقط روی دستگاه شما انتخاب می‌شود و Public URL ساخته نمی‌شود. ارسال امن پس از اتصال زیرساخت آپلود فعال خواهد شد.</p>
      {error && (
        <div className="file-upload__error" role="alert">
          <TriangleAlert aria-hidden="true" /><span>{error}</span>
          <button type="button" onClick={() => inputRef.current?.click()}><RefreshCw /> تلاش دوباره</button>
        </div>
      )}
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((item) => (
            <li key={item.id}>
              <FileCheck2 aria-hidden="true" />
              <div><bdi>{item.file.name}</bdi><small>{formatFileSize(item.file.size)} · {{ idle: 'آماده ارسال امن', uploading: 'در حال ارسال امن', success: 'ارسال شد', error: 'ارسال ناموفق؛ فایل روی دستگاه حفظ شده' }[uploadState]}</small>{uploadState !== 'idle' && <progress className={`file-progress is-${uploadState}`} aria-label={`وضعیت ارسال ${item.file.name}`} max={100} value={uploadState === 'success' ? 100 : uploadState === 'error' ? 0 : undefined} />}</div>
              <button type="button" disabled={uploadState === 'uploading'} onClick={() => onChange(files.filter((file) => file.id !== item.id))} aria-label={`حذف ${item.file.name}`}><Trash2 /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
