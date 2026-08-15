import Image from "next/image";

export const metadata = {
  title: "Comprovante de matrícula",
  robots: { index: false, follow: false },
};

const ALUNO = [
  { label: "Aluno", value: "David Herrera Ramirez" },
  { label: "Documento de identidade", value: "N01009904" },
  { label: "Nacionalidade", value: "Mexicana" },
  { label: "Nº de matrícula", value: "M992348834" },
];

const CURSO = [
  { label: "Curso", value: "Português para Estrangeiros — Nível Intermediário (B1)" },
  { label: "Modalidade", value: "Presencial" },
  { label: "Carga horária", value: "15 horas semanais (segunda a sexta, 09h00–12h00)" },
  { label: "Período letivo", value: "02 de março a 18 de dezembro" },
  { label: "Frequência", value: "92% de presença registrada" },
  { label: "Situação", value: "Matrícula ativa e mensalidades em dia" },
];

function Watermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <div className="absolute inset-0 -rotate-25 flex flex-col justify-center gap-14 opacity-[0.07]">
        {Array.from({ length: 9 }).map((_, i) => (
          <p
            key={i}
            className="whitespace-nowrap text-center text-4xl font-bold tracking-[0.3em] text-neutral-900"
          >
            DOCUMENTO DE EJEMPLO · SAMPLE · SEM VALIDADE ·{" "}
            DOCUMENTO DE EJEMPLO · SAMPLE · SEM VALIDADE
          </p>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-1 py-2.5 sm:grid-cols-[minmax(0,180px)_1fr]">
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="text-sm font-semibold text-neutral-900">{value}</dd>
    </div>
  );
}

export default function ComprovanteMaquetaPage() {
  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        

        <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-10 shadow-sm ring-1 ring-neutral-200 sm:px-14 sm:py-14">
          {/* <Watermark />  */}

          <div className="relative">
            <header className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                COMPROVANTE DE MATRÍCULA E FREQUÊNCIA
              </h1>
             
            </header>

            <section className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <dl className="order-2 flex-1 sm:order-1">
                {ALUNO.map((item) => (
                  <div key={item.label} className="mb-4 last:mb-0">
                    <dt className="text-xs tracking-wide text-neutral-500 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base font-bold text-neutral-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="order-1 sm:order-2">
                <div className="relative h-48 w-38 overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-neutral-200">
                  <Image
                    src="/image/IMG_9513.jpg"
                    alt="Foto do aluno (exemplo)"
                    fill
                    sizes="152px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </section>

            <hr className="my-10 border-neutral-200" />

            <section>
              <h2 className="text-sm font-bold tracking-wide text-emerald-700 uppercase">
                Dados do curso
              </h2>
              <dl className="mt-4 divide-y divide-neutral-100">
                {CURSO.map((item) => (
                  <Row key={item.label} {...item} />
                ))}
              </dl>
            </section>

            {/* <section className="mt-10 border-t border-neutral-200 pt-8">
              <p className="text-sm leading-relaxed text-neutral-400 italic">
                [Espaço reservado ao texto declaratório da instituição
                emissora. Neste modelo não se declara nada: trata-se de uma
                maquete de layout, sem instituição, sem aluno e sem validade.]
              </p>
            </section> */}

            <footer className="mt-10 border-t border-dashed border-neutral-300 pt-6">
              {/* <p className="text-center text-xs text-neutral-400">
                Documento de ejemplo · Sample document · Documento de exemplo —
                sin validez
              </p> */}
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}
