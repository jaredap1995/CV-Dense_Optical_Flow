import dynamic from 'next/dynamic';

const TeamComponent = dynamic(() => import('../../Components/team'), {
  ssr: false
});

function TeamPage() {
  return <TeamComponent />;
}

export default TeamPage;
