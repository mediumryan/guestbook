'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function ModifyContentHeader({
  registered_person_name,
  userName,
}: {
  registered_person_name: string | undefined;
  userName: string;
}) {
  const [btn, setBtn] = useState('modify');

  return (
    <div
      className={`flex items-center my-12 ${
        registered_person_name === userName
          ? 'justify-between'
          : 'justify-start'
      }`}
    >
      <div className="col-span-2 flex flex-col items-center">
        <div className="bg-slate-800 rounded-full w-[75px] h-[75px] flex justify-center items-center">
          <p className="text-white font-bold text-2xl opacity-40">
            {registered_person_name?.slice(0, 1).toUpperCase()}
          </p>
        </div>
        <span className="text-sm mt-2">{registered_person_name}</span>
      </div>
      <div>
        {/* delete button */}
        <Dialog>
          <DialogTrigger>
            <button
              className="bg-slate-700 text-white px-4 py-2 rounded-md mr-3 hover:opacity-75"
              type="button"
            >
              DELETE
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <button
                type="submit"
                onClick={() => {
                  setBtn('delete');
                }}
                className="bg-slate-700 text-white px-4 py-2 mx-1 rounded-md hover:opacity-75"
              >
                DELETE
              </button>
              <DialogClose>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-md hover:opacity-75">
                  No
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* submit button */}
        <Dialog>
          <DialogTrigger>
            <button
              className="bg-slate-700 text-white px-4 py-2 rounded-md hover:opacity-75"
              type="button"
            >
              SUBMIT
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <button
                form="modify-form"
                type="submit"
                onClick={() => {
                  setBtn('modify');
                }}
                className="bg-slate-700 text-white px-4 py-2 mx-1 rounded-md hover:opacity-75"
              >
                SUBMIT
              </button>
              <DialogClose>
                <button className="bg-slate-700 text-white px-4 py-2 rounded-md hover:opacity-75">
                  No
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <input type="hidden" name="btn" value={btn} />
    </div>
  );
}
