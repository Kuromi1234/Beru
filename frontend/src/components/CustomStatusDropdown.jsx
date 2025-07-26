import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { Fragment } from "react";

const statusOptions = [
  { value: "in_stock", label: "📦 In Stock" },

];

export default function CustomStatusDropdown({ selectedStatus, setSelectedStatus }) {
  const selected = statusOptions.find((s) => s.value === selectedStatus);

  return (
    <div className="w-full max-w-sm relative z-50">
      <Listbox value={selected} onChange={(val) => setSelectedStatus(val.value)}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-2xl bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-600 py-3 pl-5 pr-12 text-left text-white shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-purple-400 focus:outline-none">
            <span className="block truncate font-medium">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <FaChevronDown className="text-white opacity-70" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-2 scale-95"
          >
            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-[#1a1a2e] shadow-xl ring-1 ring-white/10 backdrop-blur-sm focus:outline-none">
              {statusOptions.map((status) => (
                <Listbox.Option
                  key={status.value}
                  className={({ active, selected }) =>
                    `cursor-pointer select-none px-5 py-3 text-sm font-medium transition-all rounded-xl ${
                      active
                        ? "bg-purple-700 text-white"
                        : selected
                        ? "bg-purple-500 text-white"
                        : "text-gray-300"
                    }`
                  }
                  value={status}
                >
                  {status.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
