"use client";

interface PreviewProps {
  formFields: { id: string; label: string; component: React.ReactNode }[];
}

function Preview({ formFields }: PreviewProps) {
  return (
    <div className="h-full overflow-auto border p-3 rounded-xl">
      <div className="space-y-4">
        {formFields?.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            {field.component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
