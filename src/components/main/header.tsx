// hooks
import Link from 'next/link';

export default function MainHeader() {
  return (
    <div className="flex justify-between my-12">
      <h3 className="text-2xl font-bold">Free GuestBook</h3>
      <Link href="/add-content">
        <button className="bg-slate-700 text-white px-4 py-2 rounded-md">
          ADD
        </button>
      </Link>
    </div>
  );
}
