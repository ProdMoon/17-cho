import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>안녕 친구들! 우린 17초 아저씨들이야.</h1>
      <p>입장을 원한다면 아래 버튼을 누르길 바래.</p>
      <Link to='/broadcasting'>
        <button>입장하기</button>
      </Link>
      <br />
      <p>
        로그인을 원한다면 아래 버튼을 누르길 바래. (하지만 원하는대로 되진
        않을걸? ㅋ)
      </p>
      <Link to='/login'>
        <button>로그인</button>
      </Link>
    </div>
  );
}

export default Home;
