import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AddContentHeader() {
  return (
    <div className="flex justify-between my-12">
      <h3 className="text-2xl font-bold">Register your opinion</h3>
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
              form="add-form"
              type="submit"
              className="bg-slate-700 text-white px-4 py-2 rounded-md hover:opacity-75"
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
  );
}
