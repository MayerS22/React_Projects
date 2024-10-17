export default function Input({ label, invalid, ...props }) {
    let labelClasses = 'block mb-2 text-xs font-bold tracking-wide uppercase text-stone-300';
    let inputClasses = 'w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow bg-stone-300';
  
    if (invalid) {
      labelClasses = 'block mb-2 text-xs font-bold tracking-wide uppercase text-red-400';
      inputClasses += ' border-red-400 bg-red-100'; // Add styles to reflect invalid state on the input field
    }
  
    return (
      <p>
        <label className={labelClasses}>{label}</label>
        <input className={inputClasses} {...props} />
      </p>
    );
  }
  