import { LoginForm } from "@/app/login/login-form";

export const metadata = { title: "Admin Sign In" };

export default function LoginPage() {
  return (
    <section className="section">
      <div className="shell">
        <LoginForm />
      </div>
    </section>
  );
}
