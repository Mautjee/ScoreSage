// use dep::std;
//
// fn probability_of_winning(winnerRating: i32, loserRating: i32) -> Field {
//   let diff: i32 = (winnerRating - loserRating) as i32;
//   let probability = (1 / (1 + (10 as i32) ^ (-diff / 400))) as Field;
//   probability
// }
//
// #[test]
// fn test_probability_of_winning() {
//    // let test = 10.pow_32(0);
//    // std::println("test1");
//    // std::println(test);
//    // let test2 = 0 / 400;
//    // std::println("test2");
//    // std::println(test2);
//    // let test3 = 10.pow_32(0 / 400);
//    // std::println("test3");
//    // std::println(test3);
//    // let test4 = 1 / 2;
//    // std::println("test4");
//    // std::println(test4);
//    // let test5 = test4 * 1500;
//    // std::println("test5");
//    // std::println(test5);
//    // std::println("===================");
//
//     let probability1 = probability_of_winning(1500, 1500);
//     std::println(probability1);
//     //assert(probability1 == 0x183227397098d014dc2822db40c0ac2e9419f4243cdcb848a1f0fac9f8000001);
//     let probability2 = probability_of_winning(1450, 1550);
//     // NOTE: I dont't know if below is correct
//     std::println(probability2);
//     //assert(probability2 == 0x183227397098d014dc2822db40c0ac2e9419f4243cdcb848a1f0fac9f8000001);
//
// }
//
// fn calculate_gains(winnerRating: i32, loserRating: i32) -> (i32, i32) {
//   //let prob = probability_of_winning(winnerRating, loserRating);
//   (winnerRating, loserRating)
// }
//
// #[test]
// fn test_calculate_gains() {
//     let (winnerGains, loserGains) = calculate_gains(1500, 1500);
//     std::println(winnerGains);
//     std::println(loserGains);
//     //assert(winnerGains == 16);
//     //assert(loserGains == -16);
// }

fn main(oldWinnerRating: pub u32, newWinnerRating: pub u32, oldLoserRating: pub u32, newLoserRating: pub u32) {
    // TODO: make proper ELO-calculation like above-ish
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

