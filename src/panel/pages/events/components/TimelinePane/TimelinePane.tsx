import React, { FC, ComponentProps, useMemo } from "react";
import styled from "styled-components";
import { DebugEvent, Operation } from "@urql/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRss,
  faQuoteLeft,
  faStopwatch,
  faKey,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { print } from "graphql";
import { Pane, CodeHighlight } from "../../../../components";
import { useTimelineContext } from "../../../../context";

/** Pane shows additional information about a selected timeline item. */
// TODO: update data structure
export const TimelinePane: FC<
  ({ event: DebugEvent } | { source: Operation }) &
    ComponentProps<typeof Container>
> = ({ event, source, ...props }) => {
  const content = useMemo(() => {
    if (source) {
      return (
        <>
          <PaneSection />
          <SourceSection operation={source} />
        </>
      );
    }

    // Conditional check for network event here

    return (
      <>
        <EventSection event={event} />
        <SourceSection operation={event.operation} />
      </>
    );
  }, [event, source]);

  return (
    <Container {...props}>
      <Body>{content}</Body>
    </Container>
  );
};

/** Info about the event clicked by the user. */
const EventSection: FC<{ event: DebugEvent }> = ({ event }) => {
  const { startTime } = useTimelineContext();
  return (
    <PaneSection>
      <h1>Event</h1>
      <p>
        <Icon icon={faRss} />
        <b style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{event.type}</b>
      </p>
      <p>
        <Icon icon={faQuoteLeft} />
        {event.message}
      </p>
      <p>
        <Icon icon={faStopwatch} />
        {`${event.timestamp - startTime}ms`}
      </p>
      {event.data && (
        <>
          <h2>Metadata</h2>
          <CodeHighlight
            language={"javascript"}
            code={JSON.stringify(event.data, null, 2)}
          />
        </>
      )}
    </PaneSection>
  );
};
/** Info about the source operation for the given event. */
const SourceSection: FC<{ operation: Operation }> = ({ operation }) => (
  <PaneSection>
    <h1>Source</h1>
    <p>
      <Icon icon={faKey} /> {operation.key}
    </p>
    <p>
      <Icon icon={faVenusMars} />
      {operation.operationName}
    </p>
    <h2>Query</h2>
    <CodeHighlight
      language={"graphql"}
      code={removeTrailingNewline(print(operation.query))}
    />
    <h2>Variables</h2>
    <CodeHighlight
      language={"javascript"}
      code={JSON.stringify(operation.variables || {}, null, 2)}
    />
  </PaneSection>
);

const Container = styled(Pane)`
  background-color: ${(p) => p.theme.dark["+3"]};
`;

const Body = styled(Pane.Body)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: column;
  }
`;

const PaneSection = styled.section`
  color: #fff;
  background: ${(props) => props.theme.dark[0]};
  max-height: 50%;
  padding: 20px;
  overflow: scroll;
  flex-grow: 1;
  flex-basis: 0;

  h1 {
    background-color: ${(p) => p.theme.dark["+3"]};
    position: sticky;
    top: -20px;
    margin: -20px;
    padding: 2px 10px;
    font-size: 14px;
    font-weight: 400;
    border-bottom: solid 1px ${(p) => p.theme.dark["+5"]};
    z-index: 1;
  }

  h2 {
    margin-top: 20px;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    margin: 10px 0;
  }

  & + & {
    border-top: solid 1px ${(p) => p.theme.dark["+3"]};
  }

  @media (max-aspect-ratio: 1/1) {
    & + & {
      border-left: solid 1px ${(p) => p.theme.dark["+3"]};
      border-top: none !important;
    }
    flex-basis: 0;
    max-height: 100%;
  }

  h1 + * {
    margin-top: 30px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 1em;
`;

const removeTrailingNewline = (s: string) =>
  s.substring(0, s.lastIndexOf("\n"));