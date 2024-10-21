import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import FeatherIcon from "feather-icons-react";

interface CardInterface {
  id: UniqueIdentifier;
  title: string;
}

function Card({ id, title }: Readonly<CardInterface>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white border-l-4 px-4 mx-4 border-green-500 rounded-lg shadow p-4 mt-2 cursor-grab"
    >
      <h3 className="text-gray-800 font-bold mb-2">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 flex items-center">
          <FeatherIcon icon="clock" className="mr-1" />3 out
        </span>
        <span className="text-sm font-bold text-purple-600">Alta</span>
      </div>
      <div className="text-sm text-gray-600 flex items-center">
        <FeatherIcon icon="bar-chart-2" className="mr-1" />
        Feito
      </div>
    </div>
  );
}

export default Card;
