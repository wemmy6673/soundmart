import { BsTelephone } from "react-icons/bs";

export default function Header() {
  return (
    <header className="bg-green-900 text-white py-2 px-44   ">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm flex flex-row items-center"><span className="text-white pr-1"><BsTelephone /></span> +2348035213805</div>
        <p className="text-sm">Get 50% off on Selected Items  |  Shop Now</p>
        <h1 className="text-sm">info@soundmart.com</h1>
      </div>
    </header>
  );
}