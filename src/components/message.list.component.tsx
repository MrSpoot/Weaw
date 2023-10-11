import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import MessageComponent from "./message.component";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { AppDispatch } from "../reducer/slice/conversationSlice";
import LoaderComponent from "./loader.component";
import { loadMoreMessages } from "../reducer/thunk/conversation.tunk";
import messageService from "../services/message.service";
import InfiniteScroll from "react-infinite-scroll-component";

const MessageListComponent: FunctionComponent<{ conversationId: string }> = ({
  conversationId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector((state: RootState) => state.conversations);

  const conversation = conversations.find(
    (c) => c.conversation.id === conversationId
  );

  const messages = conversation?.messages || [];

  const fetchMoreData = async () => {
    console.log("ALLLOOOOO");
    dispatch(loadMoreMessages(conversation?.conversation.id ?? ""));
  };

  return (
    <>
      {conversation && (
        <div className="w-full">
          <InfiniteScroll
            dataLength={conversation.totalMessagesCount}
            next={fetchMoreData}
            hasMore={conversation.hasMoreItems}
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <div className="flex flex-col-reverse w-full h-full p-4 gap-2">
              {messages.map((m, i) => (
                <MessageComponent key={messages[i].id} message={m} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default MessageListComponent;
