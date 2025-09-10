import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    link?: string;
  }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 opacity-50" style={{color: '#F0EAE1'}}>/</span>
          )}
          {item.link ? (
            <Link 
              to={item.link}
              className="transition-colors hover:opacity-80"
              style={{color: '#F0EAE1'}}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{color: '#E9BD72'}}>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
