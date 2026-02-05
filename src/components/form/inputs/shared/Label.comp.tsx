export const Label = ({ label, htmlFor }: { label?: string; htmlFor?: string }) =>
    label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
        </label>
    ) : null
