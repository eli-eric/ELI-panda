import React from "react";
import { AiFillLike } from "react-icons/ai";

interface PollReactionProps {
  userReaction: Object;
  selectedReaction: string;
}

const PollReaction: React.FC<PollReactionProps> = ({
  userReaction,
  selectedReaction,
}) => {
  /* const getReactionByPosition = (position) => {
    switch (position) {
      case 0:
        return 'like';
      case 1:
        return 'love';
      case 2:
        return 'haha';
      case 3:
        return 'wow';
      case 4:
        return 'sad';
      case 5:
        return 'angry';
    }
  };*/
  /*
  const setReactionListener = () => {
    const likeBtn = document.getElementsByClassName('mp-like-btn');
    for (let i = 0; i < likeBtn.length; i++) {
      likeBtn[i].onclick = function () {
        const reactionIcons = document.querySelectorAll('.mp-reaction-icon');
        for (let i = 0; i < reactionIcons.length; i++) {
          setTimeout(function () {
            reactionIcons[i].classList.add('show');
          }, i * 100);
          reactionIcons[i].onclick = function (event) {
            updateReactions(i);
            for (let j = 0; j < reactionIcons.length; j++) {
              setTimeout(function () {
                reactionIcons[j].classList.remove('show');
              }, j * 100);
            }
            event.stopPropagation();
          };
        }
      };
    }
  };*/
  /*
  const updateReactions = (reactionPosition) => {
    const currentReaction = getReactionByPosition(reactionPosition);
    const {userReaction, selectedReaction} = this.props;
    let {poll} = this.props;
    let reaction = poll.reaction;
    if (userReaction) {
      if (currentReaction !== selectedReaction) {
        reaction[selectedReaction] = reaction[selectedReaction] - 1;
        reaction[currentReaction] = reaction[currentReaction] + 1;
        console.log('reaction', reaction);
        this.props.onSubmitPollReaction(
          poll,
          currentReaction,
          poll.id,
          this.state.userId,
        );
      }
    } else {
      reaction[currentReaction] = reaction[currentReaction] + 1;
      this.props.onSubmitPollReaction(
        poll,
        currentReaction,
        poll.id,
        this.state.userId,
      );
    }
  };*/

  const getSelectedReaction = (selectedReaction: string) => {
    return (
      <div className="mp-show-reaction">
        {selectedReaction === "like" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/like.png" alt="" />
          </span>
        ) : null}
        {selectedReaction === "love" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/love.png" alt="" />
          </span>
        ) : null}
        {selectedReaction === "haha" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/haha.png" alt="" />
          </span>
        ) : null}
        {selectedReaction === "wow" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/wow.png" alt="" />
          </span>
        ) : null}
        {selectedReaction === "sad" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/sad.png" alt="" />
          </span>
        ) : null}
        {selectedReaction === "angry" ? (
          <span className="mp-show-reaction-thumb">
            <img src="/images/reaction/angry.png" alt="" />
          </span>
        ) : null}{" "}
        <span className="mp-text-primary mp-ml-1">Like</span>
      </div>
    );
  };

  return (
    <div className="mp-like-btn">
      <div className="mp-p-2">
        {!userReaction ? (
          <>
            <AiFillLike /> Like
          </>
        ) : (
          getSelectedReaction(selectedReaction)
        )}
      </div>
      <div className="mp-reaction-box">
        <div className="mp-reaction-icon">
          <img src="/images/reaction/like.png" alt="like" />
        </div>
        <div className="mp-reaction-icon">
          <img src="/images/reaction/love.png" alt="love" />
        </div>
        <div className="mp-reaction-icon">
          <img src="/images/reaction/haha.png" alt="" />
        </div>
        <div className="mp-reaction-icon">
          <img src="/images/reaction/wow.png" alt="" />
        </div>
        <div className="mp-reaction-icon">
          <img src="/images/reaction/sad.png" alt="" />
        </div>
        <div className="mp-reaction-icon">
          <img src="/images/reaction/angry.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PollReaction;
