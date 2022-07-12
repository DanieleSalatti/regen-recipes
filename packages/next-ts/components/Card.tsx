import Link from "next/link";

interface ICardProps {
  imgUrl: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  cta: string;
  ctaLink: string;
}

export const Card: React.FC<any> = (props: ICardProps) => {
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <figure>
        <img src={`${props.imgUrl}`} alt={`${props.title}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${props.title}`}</h2>
        <p>{`${props.description}`}</p>
        <div className="card-actions justify-end">
          <Link href={props.ctaLink} className="btn btn-primary">
            <a>{`${props.cta}`}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
