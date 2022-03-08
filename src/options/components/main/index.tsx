import { getRepoContent } from '@/common/api';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { AppContext } from '@/options';

const Main: React.FC = () => {
  const { fullName } = React.useContext(AppContext);

  const [readme, setReadme] = React.useState<string>('');

  React.useEffect(() => {
    if (!fullName) return;

    (async () => {
      const res = await getRepoContent(fullName);
      setReadme(res.content);
    })();
  }, [fullName]);

  return (
    <div className="main">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
        {decodeURIComponent(escape(window.atob(readme)))}
      </ReactMarkdown>
    </div>
  );
};

export default Main;
