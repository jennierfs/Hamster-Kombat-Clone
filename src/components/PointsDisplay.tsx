import { dollarCoin } from '../images';

interface PointsDisplayProps {
  points: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PointsDisplay = ({ points, showIcon = true, size = 'lg' }: PointsDisplayProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {showIcon && (
        <img src={dollarCoin} alt="Coin" className={iconSizes[size]} />
      )}
      <p className={`${sizeClasses[size]} text-white font-bold`}>
        {points.toLocaleString('en-US')}
      </p>
    </div>
  );
};

export default PointsDisplay;
