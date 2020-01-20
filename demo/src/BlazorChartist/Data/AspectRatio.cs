using System.Text.RegularExpressions;

namespace BlazorChartist.Data
{
    public enum AspectRatio
    {
        Square,
        MinorSecond,
        MajorSecond,
        MinorThird,
        MajorThird,
        PerfectFourth,
        PerfectFifth,
        PinorSixth,
        GoldenSection,
        MajorSixth,
        MinorSeventh,
        MajorSeventh,
        Octave,
        MajorTenth,
        MajorEleventh,
        MajorTwelfth,
        DoubleOctave,
    }

    internal static class AspectRatioExtensions
    {
        public static string ToCssClass(this AspectRatio? aspectRatio)
        {
            return aspectRatio.HasValue
                ? "ct-chart ct-" + Regex.Replace(aspectRatio.ToString(), @"([a-z])([A-Z])", "$1-$2").ToLower()
                : "ct-chart";
        }
    }
}
