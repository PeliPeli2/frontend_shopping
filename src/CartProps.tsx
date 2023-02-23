import { MouseEventHandler } from "react";

export function IncrementButton({ count , onClick }: {count : number, onClick : MouseEventHandler}) {
    return (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    );
  }