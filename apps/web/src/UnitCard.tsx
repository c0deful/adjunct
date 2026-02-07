export type Unit = {
  name: string;
};

type UnitCardProps = {
  unit: Unit;
};

export const UnitCard: React.FC<UnitCardProps> = ({unit}) => {
  // TODO add more unit details and styling
  return (
    <div className="unit-card">
      <h3>{unit.name}</h3>
    </div>
  );
}
