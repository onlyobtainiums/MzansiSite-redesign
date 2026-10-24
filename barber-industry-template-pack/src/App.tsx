import { StudioProvider, useStudio } from './state/StudioContext';
import DesignChooser from './chooser/DesignChooser';
import PreviewStudio from './studio/PreviewStudio';

function Shell() {
  const { view } = useStudio();
  return (
    <div key={view} className="mz-fade-in">
      {view === 'chooser' ? <DesignChooser /> : <PreviewStudio />}
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <Shell />
    </StudioProvider>
  );
}
