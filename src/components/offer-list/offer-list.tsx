import { useState } from 'react';
import { OfferCard } from '@/components/offer-card';
import type { Offer } from '@/types';

type OfferListProps = {
  offers: Offer[];
  variant?: 'city' | 'favorite';
  className?: string;
};

export const OfferList = ({
  offers,
  variant = 'city',
  className,
}: OfferListProps) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
          isActive={activeOfferId === offer.id}
        />
      ))}
    </div>
  );
};
