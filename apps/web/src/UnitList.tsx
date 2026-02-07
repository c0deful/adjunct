import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UnitCard, type Unit } from "./UnitCard";

const fetchUnits = async () => {
  // TODO replace with gateway API call
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch units");
  }
  return response.json();
};

const UnitList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  // TODO improve error handling with an error boundary
  return (
    <Suspense fallback={<div>Loading unit cards…</div>}>
      <div className="unit-list">
        {data.map((unit: Unit) => (
          <UnitCard key={unit.name} unit={unit} />
        ))}
      </div>
    </Suspense>
  );
};

export default UnitList;
