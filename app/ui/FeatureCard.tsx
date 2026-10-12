// Описание типов свойств
type FeatureCardProps = {
    title: string;
    description: string;
};


// Создание компонента, который принимает эти свойства
export default function FeatureCard({
    title,
    description,
}: FeatureCardProps) {
    return (
        <article>
        <h2>{title}</h2>
        <p>{description}</p>
        </article>
    );
}
