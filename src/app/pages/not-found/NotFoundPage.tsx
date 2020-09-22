import React from 'react';
import { Link } from 'react-router-dom';

import Template from '../../templates/main-template';
import { InnerContent } from '../../shared.style';

const NotFoundPage: React.FC = () => (
  <Template>
    <InnerContent>
      <h1>Sorry! That page was not found.</h1>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </InnerContent>
  </Template>
);

export default NotFoundPage;
