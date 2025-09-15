import Link from "next/link";
import { Landmark } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <Landmark className="h-5 w-5 text-primary" />
            <span className="font-semibold">VylsCapital</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground md:mt-0">
            &copy; {new Date().getFullYear()} VylsCapital. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
