import { Title } from '@mantine/core';
import { ItemInfo } from '@/lib/components/Cart/ItemInfo';

type Bag = {
  item: {
    title: string;
    priceInCents: string;
    image: string;
  };
  itemCount: number;
  productId: string;
};

type OrderInfoProps = {
  data: Bag[];
};

function OrderInfo({ data }: OrderInfoProps) {
  return (
    <div className="flex flex-col p-10 flex-1">
      <Title order={2} weight={300} color="dark">
        Your Items
      </Title>
      <div className="border rounded-lg mt-4">
        {data?.length &&
          data.map((e, i) => (
            <div key={i} className="divide-y p-5">
              <ItemInfo
                image={e.item.image}
                title={e.item.title}
                quantity={e.itemCount}
                price={(+e.item.priceInCents / 100).toString()}
                isForCheckout={true}
                productId={e.productId}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderInfo;
