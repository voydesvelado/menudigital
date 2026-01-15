import MenuItemRow from "./MenuItemRow";

export default function MenuSection({ title, items = [] }) {
  return (
    <section className="w-full px-4 pt-6">
      {/* Título de sección (SEO-friendly) */}
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <div className="divide-y">
        {items.map((item) => (
          <MenuItemRow
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}
