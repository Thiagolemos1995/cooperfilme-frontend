import { SendScriptForm } from "./_components/send-script-form";

export default function Home() {
  return (
    <div
      className="container flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 300px)" }}
    >
      <SendScriptForm />
    </div>
  );
}
