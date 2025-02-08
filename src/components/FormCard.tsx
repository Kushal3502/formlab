import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { Badge } from "./ui/badge";
import Link from "next/link";

function FormCard({ data }: { data: Form }) {
  return (
    <Link href={`/view/${data.id}`}>
      <Card className="min-h-[160px] shadow-lg hover:shadow-xl cursor-pointer flex flex-col justify-between dark:bg-zinc-900 hover:scale-105 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-normal truncate">{data.title}</CardTitle>
          {data.description && (
            <CardDescription className=" truncate">
              {data.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex justify-start items-center gap-4">
          {data.isPublished ? (
            <Badge className="bg-green-700 text-white" variant={"outline"}>
              Published
            </Badge>
          ) : (
            <Badge className="bg-red-500 text-white" variant={"outline"}>
              Draft
            </Badge>
          )}
          <span className="text-xs text-gray-500">
            Created: {data.createdAt.toLocaleDateString()}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default FormCard;
