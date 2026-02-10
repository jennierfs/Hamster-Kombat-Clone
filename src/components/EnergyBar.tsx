interface EnergyBarProps {
  energy: number;
  maxEnergy: number;
}

const EnergyBar = ({ energy, maxEnergy }: EnergyBarProps) => {
  const percentage = (energy / maxEnergy) * 100;

  return (
    <div className="w-full px-4 mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white flex items-center">
          <span className="text-yellow-400 mr-1">⚡</span>
          {energy} / {maxEnergy}
        </span>
      </div>
      <div className="w-full h-4 bg-[#43433b]/[0.6] rounded-full border-2 border-[#43433b]">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default EnergyBar;
