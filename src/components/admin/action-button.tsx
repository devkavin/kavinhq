"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type State = { ok: boolean; message: string };

export function ActionForm({
  action,
  children,
  confirm
}: {
  action: (state: State, formData: FormData) => Promise<State>;
  children: React.ReactNode;
  confirm?: string;
}) {
  const [state, formAction] = useActionState(action, { ok: false, message: "" });
  useEffect(() => {
    if (!state.message) return;
    if (state.ok) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
    >
      {children}
    </form>
  );
}

export function SubmitButton({ children = "Save" }: { children?: React.ReactNode }) {
  return <Button type="submit">{children}</Button>;
}
