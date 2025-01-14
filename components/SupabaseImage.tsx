import React from "react";
import { createClient } from "@/lib/supabase/client";

interface SupabaseImageProps {
  imageName: string;
  className?: string;
}

export default function SupabaseImage({ imageName, className }: SupabaseImageProps): React.ReactNode {
  const { data } = createClient().storage.from('ServicioSocialProjectImages').getPublicUrl(imageName);

  return (
    <img src={data.publicUrl} alt={imageName} className={className}/>
  );
}
