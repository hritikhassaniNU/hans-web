import type { ReactNode } from "react";

type Props = { sheet: string; label?: string; title: ReactNode; id?: string; as?: "h1" | "h2"; children?: ReactNode };

// Wrap the words to highlight in <em> inside `title` to give them the accent gradient.
export default function SectionHead({ sheet, label, title, id, as = "h2", children }: Props) {
  const Title = as;
  return (
    <div className="head">
      <div>
        <span className="eyebrow"><b>[{sheet}]</b>{label && <span>{label}</span>}</span>
        <Title id={id}>{title}</Title>
      </div>
      {children ? <p>{children}</p> : <span />}
    </div>
  );
}
