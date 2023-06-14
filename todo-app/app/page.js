import Image from "next/image";
import Todolist from "@/components/Todolist";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center my_bg_image">
      <Todolist title="My To Do List"></Todolist>
    </main>
  );
}
