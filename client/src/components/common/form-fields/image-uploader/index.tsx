'use client';

import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2, XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';
import { FormControl, FormField, FormItem, FormLabel, Input } from '@/components';
import { CloudUpload } from '@/icons';
import { storageService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export interface FormFieldProps {
  name?: string;
  form: UseFormReturn<any>;
  title?: string;
}

export function ImageUploader({ form, title, name = 'url' }: FormFieldProps): JSX.Element {
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  const mutation = useMutation({
    mutationFn: (data: FormData) => storageService.uploadFiles({ data }),
    onSuccess: (res) => {
      form.setValue(name, res.data.data.url, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    },
    onError: () => {
      toast.error('Something went wrong while uploading the image');
      setThumbnail(undefined);
      setFile(undefined);
    }
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      setThumbnail(URL.createObjectURL(file));
      setFile(file);
      mutation.mutate(formData);
    }
  };

  const fileName = file?.name || 'image.jpg';

  const fileSizeInKB = file?.size ? file.size / 1024 : 0;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input type="hidden" {...field} />
          </FormControl>
          <div className="relative bg-white border-dashed border-border w-full min-h-20 border rounded-md flex flex-col gap-2 justify-between items-center p-6">
            <CloudUpload className="w-9 h-9" />
            <div className="w-fit h-fit relative overflow-clip cursor-pointer">
              <span className="text-sm text-black">
                Drag your file or
                <span className="ml-1.5 text-[#1849D6] font-semibold">Browse</span>
              </span>
            </div>
            <span className="text-sm text-center text-[#6D6D6D]">Max 1 MB files are allowed</span>
            <input
              type="file"
              className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleOnChange}
            />
          </div>
          <p className="text-white text-xs">Only support .jpg, .png, .webp, .avif</p>
          {(thumbnail || field.value) && (
            <div className="min-h-[inherit] w-full h-[4.25rem] mt-2 rounded-lg bg-white flex justify-center items-center border border-border/60 relative overflow-clip">
              {mutation.isPending && (
                <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex justify-center items-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}
              <div className="flex justify-between items-center w-full h-full p-2">
                <div className="flex items-center gap-2">
                  <img src={thumbnail || field.value} alt="logo" className="object-cover w-16 h-9 flex-shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-black">{fileName}</p>
                    <p className="text-xs text-black">{fileSizeInKB} KB</p>
                  </div>
                </div>
                <XCircleIcon
                  className="mr-3 w-5 h-5 cursor-pointer text-[#858585] fill-gray-300"
                  onClick={() => {
                    setThumbnail(undefined);
                    setFile(undefined);
                    form.setValue(name, '', { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                  }}
                />
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

export default ImageUploader;
