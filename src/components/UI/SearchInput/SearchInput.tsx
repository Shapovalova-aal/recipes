import { Input } from "@heroui/input";
import { FC } from "react";

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
interface IProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: FC<IProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full rounded-medium flex justify-center items-center bg-linear-to-tr from-primary to-secondary text-white mb-4 shadow-lg">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        isClearable
        classNames={{
          input: [
            "bg-transparent",
            "!text-white/60",
            "placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            // "shadow-sm",
            "bg-default-200/10",
            "backdrop-blur-xl",
            "group-data-[focus=true]:bg-default-200/10",
            "cursor-text!",
            "hover:!bg-transparent",
          ],
        }}
        onClear={() => setSearchQuery("")}
        placeholder="Поиск..."
        radius="lg"
        startContent={<SearchIcon className="text-white/90" />}
      />
    </div>
  );
};

export default SearchInput;
