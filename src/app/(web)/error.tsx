/* eslint-disable n/handle-callback-err */
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto  flex min-h-[50vh] flex-col items-center justify-center">
      <h2 className="font-heading mb-10 text-red-800">Algo Deu Errado</h2>

      <button
        onClick={() => {
          reset();
        }}
        className="btn-primary"
      >
        Tente novamente ou entre em contato
      </button>
    </div>
  );
}
