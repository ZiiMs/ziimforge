import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { Drawer, Placeholder } from 'rsuite';
// import './NavBar.less';
import 'rsuite/lib/styles/themes/dark/index.less';
// import searchContext from '../../context/searchContext';

// const { settings, saveSearch } = useSearch();

// import 'rsuite/styles/less/index.less';

const ModDrawer = props => {
  // const [theme] = useState(props.theme);
  const [show, setShow] = useState(false);
  const [mod, setMod] = useState(null);
  // const searchContext = useContext(settings);

  // const close = () => {
  //   setShow(false);
  //   // saveSearch(e);
  //   // console.log(searchContext);
  // };

  useEffect(() => {
    setShow(props.show);
    setMod(JSON.parse(props.clickedMod));
    return () => {};
  }, [props.show, props.clickedMod]);

  return (
    <Drawer size="xs" show={show} onHide={props.onHide}>
      <Drawer.Header>
        <Drawer.Title>{mod != null && <p>{mod.name}</p>}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {mod != null && <p>{mod.summary}</p>}
        <Placeholder.Paragraph rows={20} />
      </Drawer.Body>
      <Drawer.Footer>
        <a href={mod != null && mod.websiteUrl}>{mod != null && mod.slug}</a>
      </Drawer.Footer>
    </Drawer>
  );
};

export default ModDrawer;
