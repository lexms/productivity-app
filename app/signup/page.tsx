import { SignupForm } from "@/components/auth/signup-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Join Productivity App
          </h1>
          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
