fn main(oldWinnerRating: pub u32, newWinnerRating: pub u32, oldLoserRating: pub u32, newLoserRating: pub u32) {
    assert(oldWinnerRating < newWinnerRating);
    assert(oldLoserRating > newLoserRating);
    let diffLoser = oldLoserRating - newLoserRating;
    let diffWinner = newWinnerRating - oldWinnerRating;
    assert(diffLoser == diffWinner);
}

#[test]
fn test_main() {
    main(1500, 1501, 1500, 1499);
}

