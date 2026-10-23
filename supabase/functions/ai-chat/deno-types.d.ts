declare const Deno: any;

declare module "npm:@supabase/supabase-js@2.57.4" {
  import { createClient as _createClient } from "@supabase/supabase-js";
  export { _createClient as createClient };
  export * from "@supabase/supabase-js";
}